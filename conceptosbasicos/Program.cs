﻿using conceptosbasicos.exercises;

namespace conceptosbasicos{

    class Program{

        static void Main(){

            int option = -1;
            while(option != 0){

                Console.WriteLine();
                Console.WriteLine("Menú: ");
                Console.WriteLine("1. Positive Power");
                Console.WriteLine("2. Double or Triple");
                Console.WriteLine("3. Root or Square");
                Console.WriteLine("Ingrese el numero de la opcion que desea usar, (0 para salir):");
                try{

                    option = int.Parse(Console.ReadLine()); 

                    if(option <= 15 && option >= 0){

                        if(option == 0) break;

                        bool runningOption = true;
                        while(runningOption){

                            Console.WriteLine();
                            Console.WriteLine($"Ejecutando la opcion {option}");
                            switch(option){
                                case 1: PositivePower.run();
                                    break;
                                case 2: DoubleOrTriple.run();
                                    break;
                                case 3: RootOrSquare.run();
                                    break;
                            }
        
                            int subOption = -1;
                            while(subOption != 1 && subOption != 2){

                                Console.WriteLine();
                                Console.WriteLine("1. Volver a ejecutar");
                                Console.WriteLine("2. Ir al menu");
                                Console.WriteLine("Seleccione una opcion: ");

                                subOption = int.Parse(Console.ReadLine());
                                if(subOption == 2) runningOption = false;
                            }
                            
                        }

                    }else{
                        Console.WriteLine();Console.WriteLine();
                        Console.WriteLine("Opcion invalida.");
                        option = -1;
                    } 
                }catch(FormatException){
                    Console.WriteLine();Console.WriteLine();
                    Console.WriteLine("Opcion invalida. Volviendo al menú.");
                    option = -1;
                }
            }
        }
    }
}