using Entity.Interfaces;

namespace Infrastructure;

public class GenericRepository<T> : IGenericRepository<T>
{
  public Task<T> GetByIdAsync(dynamic id)
  {
    throw new NotImplementedException();
  }

  public Task<IReadOnlyList<T>> ListAllAsync()
  {
    throw new NotImplementedException();
  }
}