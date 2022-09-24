import React, { useState } from "react";
import axiosInstance from './axios';


function App() {
  const initialFormData = Object.freeze({
		title: '',
    crime_location: '',
    image:'',
    name:''
	});

  const [postData, updateFormData] = useState(initialFormData);

	const [postimage, setPostImage] = useState(null);
  
  
  const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			console.log(e.target.files);
		}

    if ([e.target.name] == 'title') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		} else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		}

	};
  const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('title', postData.title);
		formData.append('name', postData.name);
		formData.append('crime_location', postData.crime_location);
		formData.append('image', postimage.image[0]);
		axiosInstance.post(`createreport/`, formData);
    
    alert('Crime Reported Sent successfully')
		window.location.reload();
	};
    

  return (
    <div>
      <section  className="mt-5 py-5 mb-5 pb-5">
    <div className="container ">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card" >
            <div className="card-header bg-dark text-white">
              <h4 className='text-light'>Crime report System</h4>
            </div>
            <div className="card-body">
            
              <form  className='text-dark font-weight-bold'>
                
                <div className="form-group">
                  <label htmlFor="title">Title<span className="text-danger">*</span></label>
                  <input type="text" placeholder="Enter the title of the crime" name="title" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="Name">Name<span className="text-danger">*</span></label>
                  <input type="text" name="name" placeholder="Enter your name" className="form-control" onChange={handleChange}   required/>
                </div>

                <div className="form-group">
                  <label htmlFor="Name">Crime Location<span className="text-danger">*</span></label>
                  <textarea  name="crime_location" placeholder="Enter the acurate address the crime is been commited" className="form-control" onChange={handleChange} required/>
                </div>

                <div className="form-group">
                  <label htmlFor="Name">Image of Proof (if any)<span className="text-danger">*</span></label>
                  <input type="file" accept="image/*"  name="image" className="form-control" onChange={handleChange}  required/>
                </div>
                
                <input type="submit" onClick={handleSubmit} value="Submit"   className="btn btn-dark mt-4"/>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      
    </div>
  );
}
export default App;
