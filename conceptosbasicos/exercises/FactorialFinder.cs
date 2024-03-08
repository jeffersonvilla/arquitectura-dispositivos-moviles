namespace conceptosbasicos.exercises{

    class FactorialFinder{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese un numero: ");
            try{

                int number = int.Parse(Console.ReadLine());

                int factorial = 1;
                for(int i = number; i > 0; i--){
                    factorial *= i;
                }
                
                Console.Write("----------> ");
                Console.WriteLine($"Resultado: {factorial}");   

            }catch(FormatException){
                Console.WriteLine("Debe ingresar un numero.");
            }
        }
    }
}