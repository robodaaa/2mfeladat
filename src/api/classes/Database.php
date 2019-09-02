<?php 

include_once('Customer.php');
include_once('Address.php');

Class Database {
  private $mysql_hostname = "localhost";
  private $mysql_user = "root";
  private $mysql_password = "";
  private $mysql_database = "2m_feladat";   
  private $conn;

  function __construct() {
    $this->conn = mysqli_connect($this->mysql_hostname, $this->mysql_user, $this->mysql_password, $this->mysql_database) or die("Could not connect database");
  }
  public function getCustomer($id){
    $query = "SELECT * FROM `customers` WHERE `id`=".$id;
    if ($result = $this->conn->query($query)) {
      $row = $result->fetch_row();

      $customer = new Customer($row[1], $row[2], $row[3], $row[6]);

      $result->close();
    }
    return $customer;
  }
  public function getAddress($id){
    $query = "SELECT * FROM `address` WHERE `id`= ".$id;
    if ($result = $this->conn->query($query)) {
      $row = $result->fetch_row();
      $result->close();
      if($row == null){
        return false;
      } else {
        return $row;
      }
    }
  }
  public function getAllUser() {
    $query = "SELECT * FROM `customers`";
      if ($result = $this->conn->query($query)) {
        $i = 0;
        while ($row = $result->fetch_row()) {
          $rows[$i] = $row;
          $i++;
        }
        $result->close();
      }
      return $rows;
  }
  public function getUserAllAddress($id) {
      $query = "SELECT * FROM `address` WHERE `customer_id`= ".$id;

      if ($result = $this->conn->query($query)) {
        $i = 0;
        while ($row = $result->fetch_row()) {
          $rows[$i] = $row;
          $i++;
        }
        $result->close();
        if( $i == 0 ){
          return false;
        } else {
          return $rows;
        }
      }
  }
  public function addCustomer($customer){

    $name = $customer->getName();
    $email = $customer->getEmail();
    $password = $customer->getPassword();
    $billAddress = 0;
    $delAddress = 0;
    $taxNumber = $customer->getTax();

    $query = "INSERT INTO `customers` (`id`, `name`, `email`, `password`, `bill_address`, `del_address`, `tax_number`)
              VALUES (NULL, '".$name."', '".$email."', '".$password."', '".$billAddress."', '".$delAddress."', '".$taxNumber."');";

    return mysqli_query($this->conn, $query);

    mysqli_close($this->conn);
  }
  public function addAddress($address){
    
    $zip = $address->getZip();
    $coutry = $address->getCountry();
    $city= $address->getCity();
    $street = $address->getStreet();
    $house = $address->getHouse();
    $customer = $address->getCustomer();

    $query = "INSERT INTO `address` (`id`, `zip_code`, `country`, `city`, `street`, `house_number`, `customer_id`) 
              VALUES (NULL, '".$zip."', '".$coutry."', '".$city."', '".$street."', '".$house."', '".$customer."');";

    return mysqli_query($this->conn, $query);

    mysqli_close($this->conn);
  }
  public function editCustomer($customer){
    $id = $customer->getId();
    $name = $customer->getName();
    $email = $customer->getEmail();
    $password = $customer->getPassword();
    $billAddress = 0;
    $delAddress = 0;
    $taxNumber = $customer->getTax();

    $query = "UPDATE `customers` 
              SET `name` = '".$name."', 
                  `email` = '".$email."', 
                  `password` = '".$password."', 
                  `tax_number` = '".$taxNumber."'  
              WHERE `customers`.`id` = ".$id.";";

    if ($result = $this->conn->query($query)) {
      echo "Customer update success!";
    } else {
      echo "ERROR";
    }
    $this->conn->close();
  }
  public function editAddress($address){
    $id = $address->getId();
    $zip= $address->getZip();
    $country = $address->getCountry();
    $city = $address->getCity();
    $street = $address->getStreet();
    $house = $address->getHouse();

    $query = "UPDATE `address` 
                SET `zip_code` = '".$zip."',
                    `country` = '".$country."',
                    `city` = '".$city."',
                    `street` = '".$street."', 
                    `house_number` = '".$house."' 
                WHERE `address`.`id` = ".$id.";";

    if ($result = $this->conn->query($query)) {
      return true;
    } else {
      return false;
    }
    $this->conn->close();
  }
  public function deleteCustomer($customer){
    $id = $customer->getId();

    $query = "DELETE FROM `customers` WHERE `customers`.`id` = ".$id.";";
    
    if ($result = $this->conn->query($query)) {
      echo "Customer deleted!";
    } else {
      echo "ERROR";
    }
    $this->conn->close();
  }
  public function deleteAddress($id){
    $query = "DELETE FROM `address` WHERE `address`.`id` = ".$id.";";
    if ($result = $this->conn->query($query)) {
      echo "Address deleted!";
    } else {
      echo "ERROR";
    }
    $this->conn->close();
  }
  public function setDelivery($customer, $address){
    $query = "UPDATE `customers` 
    SET   `del_address` = '".$address."'  
    WHERE `customers`.`id` = ".$customer.";";

    if ($result = $this->conn->query($query)) {
      return true;
    } else {
      return false;
    }
    $this->conn->close();
  }
  public function setBilling($customer, $address){
    $query = "UPDATE `customers` 
              SET   `bill_address` = '".$address."'  
              WHERE `customers`.`id` = ".$customer.";";

    if ($result = $this->conn->query($query)) {
      return true;
    } else {
      return false;
    }
    $this->conn->close();
  }

}// Database class end -- 

?>