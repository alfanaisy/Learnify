using Entity.Specifications;

namespace Entity.Interfaces;

public interface IGenericRepository<T>
{
  Task<IReadOnlyList<T>> ListAllAsync();
  Task<T> GetByIdAsync(dynamic id);
  Task<IReadOnlyList<T>> ListWithSpec(ISpecification<T> spec);
  Task<T?> GetEntityWithSpec(ISpecification<T> spec);
}