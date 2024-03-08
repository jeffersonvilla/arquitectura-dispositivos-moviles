namespace conceptosbasicos.exercises{

    class MidweekDay{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese un número entre 1 y 7: ");
            try{

                int number = int.Parse(Console.ReadLine());

                if(number >= 1 && number <= 7){

                    String day;
                    switch(number){
                        case 1: day = "Lunes";
                            break;
                        case 2: day = "Martes";
                            break;
                        case 3: day = "Miércoles";
                            break;
                        case 4: day = "Jueves";
                            break;
                        case 5: day = "Viernes";
                            break; 
                        default: day = "Número fuera del rango laboral";     
                            break;                  
                    }

                    Console.Write("----------> ");
                    Console.WriteLine($"Resultado: {day}");   

                }else{
                    Console.WriteLine("Debe ser un numero entre 1 y 7");
                }
 
            }catch(FormatException){
                Console.WriteLine("Debe ingresar un numero.");
            }
        }
    }
}