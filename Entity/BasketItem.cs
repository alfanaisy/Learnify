namespace Entity;

public class BasketItem
{
  public int Id { get; set; }
  public Guid CourseId { get; set; }
  public required Course Course { get; set; }
  public int BasketId { get; set; }
  public required Basket Basket { get; set; }
}