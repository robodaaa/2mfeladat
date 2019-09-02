<?php 
class Address{
    private $id;
    private $zip;
    private $country;
    private $city;
    private $street;
    private $house;
    private $customer;

    function __construct($zip, $country, $city, $street, $house, $customer) {
        $this->setZip($zip);
        $this->setCountry($country);
        $this->setCity($city);
        $this->setStreet($street);
        $this->setHouse($house);
        $this->setCustomer($customer);
    }

    public function print() {
        echo "Address class:<br>";
        echo "ID: ".$this->id."<br>";
        echo "ZIP: ".$this->zip."<br>";
        echo "COUNTRY: ".$this->country."<br>";
        echo "CITY: ".$this->city."<br>";
        echo "HOUSE: ".$this->house."<br>";
        echo "CUSTOMER: ".$this->customer."<br>";
        echo "--------------------";
    }

    // Setters
    public function setId($id) {
        $this->id = $id;
    }
    public function setZip($zip) {
        $this->zip = $zip;
    }
    public function setCountry($country) {
        $this->country = $country;
    }
    public function setCity($city) {
        $this->city = $city;
    }
    public function setStreet($street) {
        $this->street = $street;
    }
    public function setHouse($house) {
        $this->house = $house;
    }
    public function setCustomer($customer) {
        $this->customer = $customer;
    }
    // Getters
    public function getId() {
        return $this->id;
    }
    public function getZip() {
        return $this->zip;
    }
    public function getCountry() {
        return $this->country;
    }
    public function getCity() {
        return $this->city;
    }
    public function getStreet() {
        return $this->street;
    }
    public function getHouse() {
        return $this->house;
    }
    public function getCustomer() {
        return $this->customer;
    }
}

?>