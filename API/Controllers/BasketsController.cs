using API.Dto;
using API.ErrorResponse;
using AutoMapper;
using Entity;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketsController: BaseController
{
  private readonly StoreContext _context;
  private readonly IMapper _mapper;
  public BasketsController(StoreContext context, IMapper mapper)
  {
    _context = context;    
    _mapper = mapper;
  }

  [HttpGet]
  public async Task<ActionResult<BasketDto>> GetBasket()
  {
    var basket = await ExtractBasket();
    
    if (basket == null)
      return NotFound(new ApiResponse(404));

    return Ok(_mapper.Map<Basket, BasketDto>(basket));
  }

  [HttpPost]
  public async Task<ActionResult<BasketDto>> AddItemToBasket(Guid courseId)
  {
    var basket = await ExtractBasket();

    if (basket == null) basket = CreateBasket();

    var course = await _context.Courses.FindAsync(courseId);
    if (course == null) return NotFound(new ApiResponse(404));
    basket.AddCourseItem(course);

    var result = await _context.SaveChangesAsync() > 0;
    if(result) return Ok(_mapper.Map<Basket, BasketDto>(basket));

    return BadRequest(new ApiResponse(400, "Problem saving item to the basket."));
  }

  [HttpDelete]
  public async Task<ActionResult> RemoveBasketItem(Guid courseId)
  {
    var basket = await ExtractBasket();

    if(basket == null) return NotFound(new ApiResponse(404));

    basket.RemoveCourseItem(courseId);

    var result = await _context.SaveChangesAsync() > 0;
    if (result) return Ok();

    return BadRequest(new ApiResponse(400, "Problem removing item from the basket."));
  }


  private Basket CreateBasket()
  {
    var clientId = Guid.NewGuid().ToString();
    var options = new CookieOptions{IsEssential = true, Expires = DateTimeOffset.Now.AddDays(10)};
    Response.Cookies.Append("clientId", clientId, options);

    var basket = new Basket{ClientId = clientId};
    _context.Baskets.Add(basket);
    return basket;
  }

  private async Task<Basket?> ExtractBasket()
  {
    return await _context.Baskets
      .Include(b => b.Items)
      .ThenInclude(i => i.Course)
      .OrderBy(i => i.Id)
      .FirstOrDefaultAsync(x => x.ClientId == Request.Cookies["clientId"]);
  }
}