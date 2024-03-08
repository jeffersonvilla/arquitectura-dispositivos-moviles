namespace conceptosbasicos.exercises{

    class SumOfEvens{

        public static void run(){

            int sum = 0;
            for(int i = 1; i <= 50; i++){
                if(i % 2 == 0) sum += i;
            }

            Console.Write("----------> ");
            Console.WriteLine($"Resultado: {sum}"); 
        }
    }
}