
using System.Linq.Expressions;

namespace Entity.Specifications;

public class CourseWithCategoriesSpecification: BaseSpecification<Course>
{
  public CourseWithCategoriesSpecification()
  {
    IncludeMethod(x => x.Category!);
  }

  public CourseWithCategoriesSpecification(Guid id): base(x => x.Id == id)
  {
    IncludeMethod(c => c.Category!);
    IncludeMethod(c => c.Requirements!);
    IncludeMethod(c => c.Learnings!);
  }
}