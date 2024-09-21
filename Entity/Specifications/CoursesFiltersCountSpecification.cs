using System.Linq.Expressions;

namespace Entity.Specifications;

public class CoursesFiltersCountSpecification: BaseSpecification<Course>
{
  public CoursesFiltersCountSpecification(CourseParams courseParams): 
  base(courseParams.CategoryId.HasValue ? (Expression<Func<Course, bool>>)(x => x.CategoryId == courseParams.CategoryId) : null)
  {
    
  }
}