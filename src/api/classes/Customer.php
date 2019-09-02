<?php 

class Customer {
    private $id;
    private $name;
    private $email;
    private $password;
    private $tax;
    private $billingId;
    private $deliveryId;

    function __construct($name, $email, $password, $tax) {
        $this->setName($name);
        $this->setEmail($email);
        $this->setPassword($password);
        $this->setTax($tax);
    }

    // Setters
    public function setId($id) {
        $this->id = $id;
    }
    public function setName($name) {
        $this->name = $name;
    }
    public function setEmail($email) {
        $this->email = $email;
    }
    public function setPassword($password) {
        $this->password = $password;
    }
    public function setTax($tax) {
        $this->tax = $tax;
    }
    public function setBillingId($billingId) {
        $this->billingId = $billingId;
    }
    public function setDeliveryId($deliveryId) {
        $this->deliveryId = $deliveryId;
    }
    // Getters
    public function getId() {
        return $this->id;
    }
    public function getName() {
        return $this->name;
    }
    public function getEmail() {
        return $this->email;
    }
    public function getPassword() {
        return $this->password;
    }
    public function getTax() {
        return $this->tax;
    }
    public function getBillingId() {
        return $this->billingId;
    }
    public function getDeliveryId() {
        return $this->deliveryId;
    }
}

?>