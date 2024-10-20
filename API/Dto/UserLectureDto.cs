
namespace API.Dto;
public class UserLectureDto
{
    public required string CourseName { get; set; }
    public int CurrentLecture { get; set; }
    public List<SectionDto> Sections { get; set; } = [];
}
