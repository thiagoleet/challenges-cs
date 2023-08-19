using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{
	public static string Solution(string[] A, string[] B, string P)
	{
		List<string> matches = new List<string>();
		for (int i = 0; i < B.Length; i++)
		{
			if (B[i].Contains(P))
			{
				matches.Add(A[i]);
			}
		}

		if (matches.Count == 0)
		{
			return "NO CONTACT";
		}
		else if (matches.Count == 1)
		{
			return matches[0];
		}
		else
		{
			int min = matches.Min(x => x.Length);
			string shortest = matches.FirstOrDefault(x => x.Length == min);
			return shortest;
		}
	}

	public static void testSolution(string[] A, string[] B, string P, string e)
	{
		string result = Solution(A, B, P);
		Console.WriteLine((result == e) ? "PASSED" : "FAIL");
		Console.WriteLine("================");
		Console.WriteLine("");
	}

	public static void Main()
	{
		string[] A = new string[]{"pim", "pom"};
		string[] B = new string[]{"999999999", "777888999"};
		testSolution(A, B, "88999", "pom");
		A = new string[]{"sander", "amy", "ann", "michael"};
		B = new string[]{"123456789", "234567890", "789123456", "123123123"};
		testSolution(A, B, "1", "ann");
		A = new string[]{"adam", "eva", "leo"};
		B = new string[]{"121212121", "111111111", "444555666"};
		testSolution(A, B, "112", "NO CONTACT");
	}
}