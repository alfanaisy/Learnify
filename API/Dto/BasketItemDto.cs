namespace API.Dto;

public class BasketItemDto
{
  public Guid CourseId { get; set; }
  public required string Title { get; set; }
  public float Price { get; set; }
  public required string Image { get; set; }
  public required string Instructor { get; set; }
}