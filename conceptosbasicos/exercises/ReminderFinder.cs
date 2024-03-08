namespace conceptosbasicos.exercises{

    class ReminderFinder{

        public static void run(){

            try{
                Console.Write("----------> ");
                Console.Write("Ingrese el primer numero: ");
                int first = int.Parse(Console.ReadLine());

                Console.Write("----------> ");
                Console.Write("Ingrese el segundo numero: ");
                int second = int.Parse(Console.ReadLine());

                if(second != 0) {

                    int result = first % second;
                    
                    Console.Write("----------> ");
                    Console.WriteLine($"Resultado: {result}");   
                }else{
                    Console.WriteLine("El segundo no debe ser 0.");
                }

            }catch(FormatException){
                Console.WriteLine("Debe ingresar numeros enteros.");
            }
        }
    }
}