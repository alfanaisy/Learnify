
namespace Entity.Specifications;

public class CourseWithCategoriesSpecification: BaseSpecification<Course>
{
  public CourseWithCategoriesSpecification(string? sort)
  {
    IncludeMethod(x => x.Category!);

    if(!string.IsNullOrEmpty(sort))
    {
      switch(sort)
      {
        case "priceAscending":
          SortMethod(c => c.Price);
          break;
        case "priceDescending":
          SortByDescendingMethod(c => c.Price);
          break;
        default:
          SortMethod(c => c.Title!);
          break;
      }
    }
  }

  public CourseWithCategoriesSpecification(Guid id): base(x => x.Id == id)
  {
    IncludeMethod(c => c.Category!);
    IncludeMethod(c => c.Requirements!);
    IncludeMethod(c => c.Learnings!);
  }
}