namespace conceptosbasicos.exercises{

    class TaxCalculator{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese un numero: ");
            try{
                
                int number = int.Parse(Console.ReadLine());

                Console.Write("----------> ");
                if(number > 12000){
                    double impuesto = (number - 12000) * 0.15;
                    Console.WriteLine($"Resultado: {impuesto:0.00}");  
                }else{
                    Console.WriteLine("Resultado: No debe impuestos.");
                }

            }catch(FormatException){
                Console.WriteLine("Debe ingresar un numero.");
            }
        }
    }
}