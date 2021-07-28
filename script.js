var next=$("#next");
var prev=$("#prev");
var page=1;

function updateButtons(images){
    if(page===1){
       prev.attr("disabled","true");
       next.removeAttr("disabled");
    }
    else if(images.length==0){
        next.removeAttr("disabled","true");
        prev.removeAttr("disabled");
        page--;
    }
    else{
        next.removeAttr("disabled");
        prev.removeAttr("disabled");
    }
}


function displayPage(page){
    let solno=$('#sol').val();
    if(solno===""){
        alert("Please Enter the input field");
    }
    $.ajax({
       url:"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
       method:'GET',
       success:function(data){
           let images=data.photos;
           updateButtons(images);
           if(images.length==0){
               alert("No more images to show");
           }
           else{
            $('#image_container').empty();
           for(let i=0;i<images.length;++i){
              $('#image_container').append('<img src= "'+images[i].img_src+'"+alt="'+images[i].id+'">');
           }
        }
       },
       data:{
           api_key:'xhIiT2RXlIaaNUgPLSzMeWjEBaIMTTx2d8fgCVAm',
           sol:solno,
           page:page,
       }
    }).fail(function(){
        console.log("Failed");
    });
}



$("#get_image").click(function(event){
    event.preventDefault();
    page=1;
    displayPage(page);
});

next.click(function(event){
    displayPage(++page);
});

prev.click(function(event){
    displayPage(--page);
});