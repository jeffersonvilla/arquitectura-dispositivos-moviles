namespace conceptosbasicos.exercises{

    class VowelCounter{

        public static void run(){

            Console.Write("----------> ");
            Console.Write("Ingrese una palabra: ");

            String word = Console.ReadLine();
            char[] letters = word.ToLower().ToCharArray();

            int vowels = 0;
            for(int i = 0; i < letters.Length; i++){
                if(letters[i] == 'a' || letters[i] == 'e' || letters[i] == 'i' || 
                    letters[i] == 'o' || letters[i] == 'u'){
                        vowels++;
                }
            }

            Console.Write("----------> ");
            Console.WriteLine($"Resultado: {vowels}");   
        }
    }
}