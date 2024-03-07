namespace conceptosbasicos.exercises{

    class PositivePower{

        static void run(){

            int number;
            Console.WriteLine("Ingrese un numero: ");
            String? line = Console.ReadLine();
            bool isValidNumber = int.TryParse(line, out number);
            if(isValidNumber){
                if(number >= 0) Console.WriteLine(number * number);
                else Console.WriteLine("Número negativo.");
            }else{
                Console.WriteLine("Debe ingresar un numero.");
            }
        }
    }
}