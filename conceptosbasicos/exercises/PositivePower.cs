namespace conceptosbasicos.exercises{

    class PositivePower{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese un numero: ");
            try{

                int number = int.Parse(Console.ReadLine());

                int power = number * number;
                
                Console.Write("----------> ");
                if(number >= 0) Console.WriteLine($"Resultado: {power}");   
                else Console.WriteLine("Resultado: Número negativo.");

            }catch(FormatException){
                Console.WriteLine("Debe ingresar un numero.");
            }
        }
    }
}