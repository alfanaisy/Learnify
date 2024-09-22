namespace Entity;

public class Basket
{
  public int Id { get; set; }
  public required string ClientId { get; set; }
  public List<BasketItem> Items { get; set; } = new List<BasketItem>();

  public void AddCourseItem(Course course)
  {
    if(Items.All(item => item.CourseId != course.Id))
    {
      Items.Add(new BasketItem{Course = course, Basket = this});
    }
  }

  public void RemoveCourseItem(Guid courseId)
  {
    var course = Items.FirstOrDefault(item => item.CourseId == courseId);
    if(course != null)
      Items.Remove(course);
  }
}