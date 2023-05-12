import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function VoucherForm() {
  const [show, setShow] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const fetchVoucher = [{
    voucherID: 1,
      title: "VOUCHER 10%",
      description: " Giảm giá 10%",
      value: 0.1
  },{
    voucherID: 2,
      title: "VOUCHER 20%",
      description: " Giảm giá 20%",
      value: 0.2
  },{
    voucherID: 3,
      title: "VOUCHER 30%",
      description: " Giảm giá 30%",
      value: 0.3
  }, {
    voucherID: 4,
      title: "VOUCHER 40%",
      description: " Giảm giá 40%",
      value: 0.4
  }];
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  useEffect(()=>{
    setVouchers(fetchVoucher)
    
  })

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Voucher Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>        
        <div class="mb-3">
          <label class="form-label">Loại voucher</label>
            <input type="text" 
            name="voucherId" 
            id="voucherId" 
            class="form-control voucherId" 
            list='listVoucherID'
            required />
            <datalist id="listVoucherID">
              {vouchers && vouchers.map((option) =>
                <option key = {option.voucherID} value={option.title}/>
              )}
            </datalist>
            </div>
            <div class="mb-3">
          <label class="form-label">Số lượng</label>
          <input type="number" name="quantity" id="quantity" class="form-control price" required/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

