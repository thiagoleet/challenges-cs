using System;
using System.Text;
using System.Linq;

public class Program
{
	public static string Solution(int N)
	{
		Random random = new Random();
		StringBuilder result = new StringBuilder(N);
		if (N == 1)
		{
			result.Append('a');
		}		
		else if (N % 2 != 0)
		{
			for (int i = 1; i <= N; i++)
			{
				result.Append('a');
			}			
		} else {
			for (int i = 1; i < N; i++)
			{
				result.Append('a');
			}	
			result.Append('n');
		}

		return result.ToString();
	}

	public static int countOccurences(string source, char c)
	{
		return source.Count(x => x == c);
	}

	public static bool isOddCount(int count)
	{
		return count % 2 != 0;
	}
	
	

	public static void testSolution(int N)
	{
		string result;
		int countA = 0;
		int countB = 0;
		bool isOddA = false;
		bool isOddB = false;
		result = Solution(N);
		countA = countOccurences(result, 'a');
		countB = countOccurences(result, 'b');
		isOddA = isOddCount(countA);
		isOddB = isOddCount(countB);
		Console.WriteLine("Given N = " + N.ToString());
		Console.WriteLine("result = " + result + (result.Length == N ? " OK" : " WRONG"));
		Console.WriteLine("occurences of A = " + countA.ToString() + " is odd: " + isOddA);
		if (countB > 0)
		{
			Console.WriteLine("occurences of B = " + countB.ToString() + " is odd: " + isOddB);
		}

		Console.WriteLine("=====");
		Console.WriteLine("");
	}

	public static void Main()
	{
		testSolution(1);
		testSolution(2);
		testSolution(4);
		testSolution(7);
		testSolution(500);
	}
}