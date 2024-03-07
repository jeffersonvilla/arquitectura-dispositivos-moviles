using conceptosbasicos.exercises;

namespace conceptosbasicos{

    class Program{

        static void Main(){

            int option = -1;
            String? line;
            while(option != 0){

                Console.WriteLine();
                Console.WriteLine("Menú: ");
                Console.WriteLine("1. Positive Power");
                Console.WriteLine("2. Double or Triple");
                Console.WriteLine("Ingrese el numero de la opcion que desea usar, (0 para salir):");
                line = Console.ReadLine();
                bool isValidNumber = int.TryParse(line, out option);
                if(isValidNumber && option <= 15 && option >= 0){

                    if(option == 0) break;

                    bool runningOption = true;
                    while(runningOption){

                        Console.WriteLine();
                        Console.WriteLine($"Ejecutando la opcion {option}");
                        switch(option){
                            case 1: Console.WriteLine("Sin implementar");
                                break;
                            case 2: Console.WriteLine("Sin implementar");
                                break;
                        }
    
                        Console.WriteLine();
                        Console.WriteLine("1. Volver a ejecutar");
                        Console.WriteLine("2. Ir al menu");
                         
                        Console.WriteLine("Seleccione una opcion: ");
                        int subOption = -1;
                        String? subLine = Console.ReadLine();
                        bool isValidSubOption = int.TryParse(subLine, out subOption);
                        if(isValidSubOption){
                            if(subOption == 2) runningOption = false;
                        }else {

                            Console.WriteLine();Console.WriteLine();
                            Console.WriteLine("Opcion invalida. Volviendo al menú.");
                            runningOption = false;
                        }
                    }

                }else{
                    Console.WriteLine();Console.WriteLine();
                    Console.WriteLine("Opcion invalida.");
                    option = -1;
                }   
            }
        }
    }
}