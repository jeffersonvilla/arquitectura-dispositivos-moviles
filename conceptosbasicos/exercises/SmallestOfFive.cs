namespace conceptosbasicos.exercises{

    class SmallestOfFive{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese cinco numeros separados por coma y espacio (ejemplo: 1, 2, 3, 4, 5): ");

            try{

                String line = Console.ReadLine();
                String[] numbers = line.Split(", ");

                if(numbers.Length == 5){

                    int min = int.MaxValue;
                    for(int i = 0; i < 5; i++){
                        int current = int.Parse(numbers[i]);
                        if(current < min) min = current;
                    }

                    Console.Write("----------> ");
                    Console.WriteLine($"Resultado: {min}");   
                }else{
                    Console.WriteLine("Debe ingresar cinco numeros separados por coma y espacio.");
                } 
                
            } catch(FormatException){
                Console.WriteLine("Debe ingresar numeros.");
            }
        }
    }
}