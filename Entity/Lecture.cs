
namespace Entity;

public class Lecture
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Url { get; set; }
    public int SectionId { get; set; }
    public Section? Section { get; set; }

}
