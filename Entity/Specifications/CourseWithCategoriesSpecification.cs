using System.Linq.Expressions;

namespace Entity.Specifications;

public class CourseWithCategoriesSpecification: BaseSpecification<Course>
{
  public CourseWithCategoriesSpecification(CourseParams courseParams)
    : base(courseParams.CategoryId.HasValue ? (Expression<Func<Course, bool>>)(x => x.CategoryId == courseParams.CategoryId) : null)
  {
    IncludeMethod(x => x.Category!);

    ApplyPagination(courseParams.PageSize, courseParams.PageSize * (courseParams.PageIndex-1));

    if(!string.IsNullOrEmpty(courseParams.Sort))
    {
      switch(courseParams.Sort)
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