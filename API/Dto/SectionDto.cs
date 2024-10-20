using Entity;

namespace API.Dto;
public class SectionDto
{
    public required string SectionName { get; set; }
    public List<LectureDto> Lectures { get; set; } = [];
}
