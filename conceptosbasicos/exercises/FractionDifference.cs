namespace conceptosbasicos.exercises{

    class FractionDifference{

        public static void run(){

            try{
                Console.Write("----------> ");
                Console.Write("Ingrese la primer fraccion (ejemplo: 1/2): ");
                String? firstFraction = Console.ReadLine();
                String[] first = firstFraction.Split("/");

                Console.Write("----------> ");
                Console.Write("Ingrese la segunda fraccion (ejemplo: 1/2): ");
                String? secondFraction = Console.ReadLine();
                String[] second = secondFraction.Split("/");

                int denominator = int.Parse(first[1]) * int.Parse(second[1]);

                int numerator = (int.Parse(first[0]) * int.Parse(second[1])) - (int.Parse(first[1]) * int.Parse(second[0]));
                
                int min = Math.Min(denominator, numerator);
                int max = Math.Max(denominator, numerator);

                int mcd;
                do{
                    mcd = min; min = max % min; max = mcd;
                }while(min != 0);

                Console.Write("----------> ");
                if(numerator != 0) Console.WriteLine($"Resultado: {numerator/mcd}/{denominator/mcd}");   
                else Console.WriteLine($"Resultado: 0");   

            }catch(FormatException){
                Console.WriteLine("Debe ingresar numeros enteros en numerador y dominador de ambas fracciones.");
            }
        }
    }
}