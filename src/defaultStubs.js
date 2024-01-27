const stubs = {};

stubs.cpp = `// Write your code here

#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}
`;

stubs.py = `print("Hello User")`;

stubs.java = `//Write your code here
//Use Main for your main class name always

public class Main{
    public static void main(String[] args){
        System.out.println("Hello, World!");
    }
}
`;
export default stubs;