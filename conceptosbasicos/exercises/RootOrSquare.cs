namespace conceptosbasicos.exercises{

    class RootOrSquare{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese un numero: ");
            try{

                double number = double.Parse(Console.ReadLine());

                double square = Math.Pow(number, 2);

                double root = Math.Sqrt(number);
                
                Console.Write("----------> ");
                if(number >= 0) Console.WriteLine($"Resultado: {root}");   
                else Console.WriteLine($"Resultado: {square}"); 

            }catch(FormatException){
                Console.WriteLine("Debe ingresar un numero.");
            }
        }
    }
}