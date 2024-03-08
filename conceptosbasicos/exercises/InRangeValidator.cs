namespace conceptosbasicos.exercises{

    class InRangeValidator{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese un numero: ");
            try{

                int number = int.Parse(Console.ReadLine());
                
                Console.Write("----------> ");
                if(number >= 10 && number <= 20) Console.WriteLine($"Resultado: Está en el rango");   
                else Console.WriteLine($"Resultado: Fuera del rango");   

            }catch(FormatException){
                Console.WriteLine("Debe ingresar un numero.");
            }
        }
    }
}