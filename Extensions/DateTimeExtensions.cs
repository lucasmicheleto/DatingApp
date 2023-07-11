namespace DatingApp;

public static class DateTimeExtensions
{
    public static int CalculateAge(this DateOnly date)
    {
        var today = DateOnly.FromDateTime(DateTime.Today);
        int age = today.Year - date.Year;
        if (today < date.AddYears(age)) age--;
        return age;
    }
}
