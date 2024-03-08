namespace conceptosbasicos.exercises{

    class CirclePerimeter{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese el radio del circulo: ");
            try{

                double radio = double.Parse(Console.ReadLine());

                double perimeter = 2.0 * Math.PI * radio;

                Console.Write("----------> ");
                Console.WriteLine($"Resultado: {perimeter:0.00}");   

            }catch(FormatException){
                Console.WriteLine("Debe ingresar un numero.");
            }
        }
    }
}