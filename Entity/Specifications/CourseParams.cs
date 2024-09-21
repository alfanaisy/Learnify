namespace Entity.Specifications;

public class CourseParams
{
  public string? Sort { get; set; }
  public int? CategoryId { get; set; }
  public int PageIndex { get; set; } = 1;
  private const int MaxPageSize = 20;
  private int _pageSize = 3;
  public int PageSize
  {
    get { return _pageSize; }
    set 
    { 
      _pageSize = value > MaxPageSize ? 20 : value;
    }
  }
  
}