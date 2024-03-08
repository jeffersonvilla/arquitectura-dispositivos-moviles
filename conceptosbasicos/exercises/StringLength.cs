namespace conceptosbasicos.exercises{

    class StringLength{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese una palabra: ");

            String word = Console.ReadLine();
            
            Console.Write("----------> ");
            Console.WriteLine($"Resultado: {word.Length}");   
        }
    }
}