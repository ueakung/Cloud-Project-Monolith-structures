document.getElementById("upload-submit").addEventListener("click", function(event){
    event.preventDefault()
});
async function upload(file){
    const comp = this;
    console.log(`fn is running with ${file.files[0]}`);
    var image = file.files[0];

    var img = new Image();

    img.src = window.URL.createObjectURL(image);

    img.onload = async function() {
        var image_width = img.naturalWidth;
        var image_height = img.naturalHeight;
        var image_size = image.size;
        var image_type = image.type;

        window.URL.revokeObjectURL( img.src );

        console.log(image_height);
        console.log(image_width);
        console.log(image_size);
        console.log(image_type);

        if (image_height > 200 || image_width > 200) {
            alert("Dimension of an image must not exceed 200px x 200px");
        }
        else if (image_size > 51200) {
            alert("Image size must not exceed 50KB");
        }
        else if (image_type != "image/jpeg") {
            alert("Image type must be .JPEG");
        }
        else {
            var formData = new FormData();

            formData.append("image", image);

            const api_url = "http://localhost:8080/upload/";
            const res = await postapi(api_url, image);
            console.log(res);
            alert("Image uploaded");
        }
    }
}

async function postapi(url, data) {
    console.log(data);
    const response = await fetch('https://bam9hcsrvk.execute-api.us-east-1.amazonaws.com/upload', {
        method: 'PUT',
        body: JSON.stringify({
            userID:localStorage.getItem("userID"),
            name:data.name
        }),
    });  
    var res = await response.json();

    const response2 = await fetch('https://vb8we5lg7f.execute-api.us-east-1.amazonaws.com/api/projectmicro/'+data.name, {
        method: 'PUT',
        body:data
    });  
    var res2 = await response2;
    return res
}

function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
  
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
  
        $('.image-title').html(input.files[0].name);
      };
  
      reader.readAsDataURL(input.files[0]);
  
    } else {
      removeUpload();
    }
  }
  
  function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
  }
  $('.image-upload-wrap').bind('dragover', function () {
          $('.image-upload-wrap').addClass('image-dropping');
      });
      $('.image-upload-wrap').bind('dragleave', function () {
          $('.image-upload-wrap').removeClass('image-dropping');
  });

  function logout() {
    alert("Logging out. Redirect to Login Page.");
    window.location.replace("index.html");
}

