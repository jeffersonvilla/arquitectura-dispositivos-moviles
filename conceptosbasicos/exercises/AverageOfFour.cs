namespace conceptosbasicos.exercises{

    class AverageOfFour{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese cuatro numeros separados por coma y espacio (ejemplo: 2, 4, 6, 8): ");

            try{

                String line = Console.ReadLine();
                String[] numbers = line.Split(", ");

                if(numbers.Length == 4){

                    double result = 0.0;
                    for(int i = 0; i < 4; i++){
                        result += double.Parse(numbers[i]);
                    }
                    result /= 4.0;

                    Console.Write("----------> ");
                    Console.WriteLine($"Resultado: {result: 0.00}");   
                }else{
                    Console.WriteLine("Debe ingresar cuatro numeros separados por coma y espacio.");
                } 
                
            } catch(FormatException){
                Console.WriteLine("Debe ingresar numeros.");
            }
        }
    }
}