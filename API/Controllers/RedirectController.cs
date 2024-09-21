using API.ErrorResponse;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("redirect/{code}")]
public class RedirectController: BaseController
{
  [HttpGet]
  [HttpPost]
  [HttpPut]
  [HttpDelete]
  public IActionResult Error(int code)
  {
    return new ObjectResult(new ApiResponse(code));
  }
}