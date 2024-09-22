namespace API.Dto;

public class BasketDto
{
  public required string ClientId { get; set; }
  public required List<BasketItemDto> Items { get; set; }
}