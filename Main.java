import java.util.*;
class Car {

    int id;
    String name;
    String category;
    String fuel;
    int price;

    Car(int id,String name,String category,String fuel,int price){
        this.id=id;
        this.name=name;
        this.category=category;
        this.fuel=fuel;
        this.price=price;
    }

   @Override
public String toString(){
        return id+ " | " +name+ " | " +category+ " | " +fuel+ " |Rs." +price;
    }
}

/* ==============================
   LINKED LIST FOR BOOKINGS
   ============================== */

class BookingNode{
    String carName;
    BookingNode next;

    BookingNode(String carName){
        this.carName=carName;
        next=null;
    }
}

class BookingList{

    BookingNode head;

    void addBooking(String car){

        BookingNode node=new BookingNode(car);

        if(head==null){
            head=node;
            return;
        }

        BookingNode temp=head;

        while(temp.next!=null){
            temp=temp.next;
        }

        temp.next=node;
    }

    void displayBookings(){

        BookingNode temp=head;

        System.out.println("\nTest Drive Bookings:");

        while(temp!=null){
            System.out.println(temp.carName);
            temp=temp.next;
        }
    }
}

/* ==============================
   MAIN SYSTEM CLASS
   ============================== */

 public class Main {

static ArrayList<Car> cars = new ArrayList<>();

static Stack<Car> recentView = new Stack<>();

static Queue<Car> testDriveQueue = new LinkedList<>();

static PriorityQueue<Car> vipQueue = new PriorityQueue<>(
(a,b)->b.price-a.price
);

static HashMap<Integer,Car> carMap = new HashMap<>();

static BookingList bookings = new BookingList();

/* ==============================
   LOAD CARS
   ============================== */

static void loadCars(){

cars.add(new Car(1,"Lamborghini Urus","Sports","Petrol",42000000));
cars.add(new Car(2,"Ferrari 296","Sports","Hybrid",54000000));
cars.add(new Car(3,"Porsche 911","Sports","Petrol",28000000));
cars.add(new Car(4,"Rolls Royce Ghost","Ultra Luxury","Petrol",72000000));
cars.add(new Car(5,"Bentley Continental","Ultra Luxury","Petrol",48000000));
cars.add(new Car(6,"Range Rover","Ultra Luxury","Diesel",41000000));
cars.add(new Car(7,"Toyota Fortuner","Lifestyle","Diesel",2900000));
cars.add(new Car(8,"Hyundai Creta","Lifestyle","Petrol",1600000));
cars.add(new Car(9,"Kia Seltos","Lifestyle","Diesel",1500000));
cars.add(new Car(10,"Tesla Model S","Sports","Electric",12000000));

for(Car c:cars){
carMap.put(c.id,c);
}

}

/* ==============================
   DISPLAY
   ============================== */

static void display(List<Car> list){
    for(Car c : list){
        System.out.println(c);
    }
}

/* ==============================
   SEARCH
   ============================== */

static void searchCar(String name){

for(Car c:cars){

if(c.name.toLowerCase().contains(name.toLowerCase())){

System.out.println("Found : "+c);
recentView.push(c);
return;

}

}

System.out.println("Car not found");

}

/* ==============================
   BINARY SEARCH
   ============================== */

static Car binarySearch(int price){

cars.sort(Comparator.comparingInt(c->c.price));

int l=0;
int r=cars.size()-1;

while(l<=r){

int mid=(l+r)/2;

if(cars.get(mid).price==price){
return cars.get(mid);
}
if(cars.get(mid).price == price){
    return cars.get(mid);
}

if(cars.get(mid).price < price){
    l = mid + 1;
}else{
    r = mid - 1;
}
}

return null;

}

/* ==============================
   FILTER CATEGORY
   ============================== */

static void filterCategory(String category){

for(Car c:cars){

if(c.category.equalsIgnoreCase(category)){
    System.out.println(c);
}
}

}

/* ==============================
   FILTER FUEL
   ============================== */

static void filterFuel(String fuel){

for(Car c:cars){

if(c.fuel.equalsIgnoreCase(fuel)){
    System.out.println(c);
}
}

}

/* ==============================
   COMPARE CARS
   ============================== */

static void compareCars(int id1,int id2){

Car c1=carMap.get(id1);
Car c2=carMap.get(id2);

System.out.println("\nComparison\n");

System.out.println("Car 1 : "+c1);
System.out.println("Car 2 : "+c2);

if(c1.price > c2.price){
    System.out.println("More Expensive : " + c1.name);
}else{
    System.out.println("More Expensive : " + c2.name);
}
}
/* ==============================
   TEST DRIVE
   ============================== */

static void bookTestDrive(int id){

Car car = carMap.get(id);

if(car == null){
    System.out.println("Invalid Car ID");
    return;
}

testDriveQueue.add(car);

bookings.addBooking(car.name);

if(car.category.equals("Ultra Luxury")){
    vipQueue.add(car);
}
System.out.println("Test Drive Booked for "+car.name);

}

/* ==============================
   SORTING
   ============================== */

static void bubbleSort(){

for(int i=0;i<cars.size()-1;i++){

for(int j=0;j<cars.size()-i-1;j++){

if(cars.get(j).price>cars.get(j+1).price){

Collections.swap(cars,j,j+1);

}

}

}

display(cars);

}

static void selectionSort(){

for(int i=0;i<cars.size();i++){

int min=i;

for(int j=i+1;j<cars.size();j++){

if(cars.get(j).price < cars.get(min).price){
    min = j;
}
}

Collections.swap(cars,i,min);

}

display(cars);

}

/* ==============================
   MAIN MENU
   ============================== */

public static void main(String[] args){

Scanner sc=new Scanner(System.in);

loadCars();

while(true){

System.out.println("\n===== CAR SELLING SYSTEM =====");

System.out.println("1 View Cars");
System.out.println("2 Search Car");
System.out.println("3 Filter Category");
System.out.println("4 Filter Fuel");
System.out.println("5 Compare Cars");
System.out.println("6 Book Test Drive");
System.out.println("7 Show Test Drive Queue");
System.out.println("8 Sort Cars (Bubble)");
System.out.println("9 Sort Cars (Selection)");
System.out.println("10 Binary Search by Price");
System.out.println("11 Show Bookings");
System.out.println("12 Exit");

int ch=sc.nextInt();

switch(ch){

case 1 -> display(cars);

case 2 -> {
    System.out.print("Enter name: ");
    sc.nextLine();
    searchCar(sc.nextLine());
}

case 3 -> {
    System.out.print("Enter category (Sports/Ultra Luxury/Lifestyle): ");
    filterCategory(sc.next());
}

case 4 -> {
    System.out.print("Enter fuel type: ");
    filterFuel(sc.next());
}

case 5 -> {
    System.out.print("Enter car id1 and id2: ");
    compareCars(sc.nextInt(),sc.nextInt());
}

case 6 -> {
    System.out.print("Enter car id: ");
    bookTestDrive(sc.nextInt());
}

case 7 -> {
    for(Car c : testDriveQueue){
        System.out.println(c);
    }
}

case 8 -> bubbleSort();

case 9 -> selectionSort();

case 10 -> {
    System.out.print("Enter price: ");
    Car car = binarySearch(sc.nextInt());
    System.out.println(car);
}

case 11 -> bookings.displayBookings();

case 12 -> {
    sc.close();
    System.out.println("Thank you!");
    return;
}

default -> System.out.println("Invalid Choice");

}
}

}

}

