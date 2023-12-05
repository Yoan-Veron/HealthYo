window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};


var kalorie = 0
var gras = 0
var glucyde = 0
var sugar = 0
var phibre = 0
var protein = 0
var salt = 0


function CreateAlertDialog(val){
  if (val == 2) {
    page = 'my-alert-dialog'
    pagehtml = 'alert-dialog.html'
  }
  else if (val == 3) {
    page = 'my-alert-dialogajoue'
    pagehtml = 'alert-dialogajoue.html'
  }

  else if (val ==7) {
    page = 'my-alert-dialoginfo'
    pagehtml = 'alert-dialoginfo.html'
  }
  else if (val ==8) {
    aliment = sessionStorage.getItem("aliment")
    d = lecturedonnes(aliment)
      if(d[0] == 0){
    page = 'my-alert-dialogedit'
    pagehtml = 'alert-dialogedit.html'
  }
  else {
    $(ons.notification.toast('Vous ne pouvez pas modifier un aliment que vous avez d&eacute;j&agrave; consomm&eacute;', { timeout: 2000, animation: 'fall' }))
  }
  }

  dialog = document.getElementById(page);
  if (dialog) {
    dialog.show();
  }
  else {
    ons.createElement(pagehtml, { append: true })
     .then(function(dialog) {
        dialog.show();
      });
  }

}

function trialiment(){
  liste=[]
  for (var i = 0; i < localStorage.length; i++) {
     cle = localStorage.key(i);
     if ((cle != "Today") && (cle != "Objectifcalorie") && (cle != "Objectifgras")&& (cle != "Objectifglucide") && (cle != "Objectifsucre") && (cle != "Objectiffibre") && (cle != "Objectifprot") && (cle != "Objectifsel")) {
       liste.push(cle)
     }}
  taille = liste.length
  for (i = taille - 1; i > 0 ; i--) {
    fin = taille - i
    for (j = taille - 1; j >= fin ; j--)
    {
      if (liste[j] < liste[j-1])
       {
         e = liste[j]
         liste[j] = liste[j-1]
         liste[j-1] = e
       }
    }
  }
   return liste
}

function affiche_aliments(){
  trialiment()
  $("#d_liste").html("")
  for (var i = 0; i < liste.length; i++) {
     cle = liste[i];
     entree = lecturedonnes(cle);
     v = entree.split("@")
     chaine = '<ons-list-item style="font-size: 15px;" ><div class="left" data-calorie="'+v[1]+'  data-gras="'+v[2]+'" data-glucide="'+v[3]+'"  data-sucres="'+v[4]+'" data-fibre="'+v[5]+'"  data-protein= "'+v[6]+'"   data-sel="'+v[7]+'" >'+cle+"&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"+'</div> <div data-cle= "'+cle+'" class="center"  name=text size=2 style="text-align: right;" >'+v[0]+'</div><div class="right"><button class=buttonplus><i class="fa fa-plus"></i></button> &nbsp; &nbsp; &nbsp; <button class=buttonmoins><i class="fa fa-minus"></i></button>&nbsp; &nbsp; &nbsp;<button class=buttontrash><i class="fa fa-trash"></i></button>&nbsp; &nbsp;<button class=buttoninfo><i class="fa fa-info"></i></button></div></ons-list-item>'

     $("#d_liste").append(chaine);

}
}

function lecturedonnes(entree){
  return localStorage.getItem(entree)
}

function modifdonne(entree,val){
  localStorage.setItem(entree,val)
}

function nouveau_jour(){
  trialiment()
  $("#d_liste").html("")
  for (var i = 0; i < liste.length; i++) {
     cle = liste[i];
     entree = lecturedonnes(cle);
     v = entree.split("@")
     modifdonne(cle,"0@"+v[1]+"@"+v[2]+"@"+v[3]+"@"+v[4]+"@"+v[5]+"@"+v[6]+"@"+v[7]);
     entree = lecturedonnes(cle);
     v = entree.split("@")
     chaine = '<ons-list-item style="font-size: 15px;"><div class="left"  data-calorie="'+v[1]+'  data-gras="'+v[2]+'" data-glucide="'+v[3]+'"  data-sucres="'+v[4]+'" data-fibre="'+v[5]+'"  data-protein= "'+v[6]+'"   data-sel="'+v[7]+'" >'+cle+"&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"+'</div><div data-cle= "'+cle+'" class="center"  name=text size=2 style="text-align: center;">'+v[0]+'</div><div class="right"><button class=buttonplus><i class="fa fa-plus"></i></button> &nbsp; &nbsp; &nbsp; <button class=buttonmoins><i class="fa fa-minus"></i></button>&nbsp; &nbsp; &nbsp;<button class=buttontrash><i class="fa fa-trash"></i></button>&nbsp; &nbsp;<button class=buttoninfo><i class="fa fa-info"></i></button></div></ons-list-item>'

     $("#d_liste").append(chaine);

   }
}

function datecompare(){
  Ladate = new Date();
  Datecourante = Ladate.getDate().toString()+Ladate.getMonth().toString()+Ladate.getFullYear().toString();

  if(!lecturedonnes('Today')) {
  modifdonne('Today','0@0@0@0@0@0@0@'+Datecourante);
  modifdonne('Objectifcalorie',1000);
  modifdonne('Objectifgras',20);
  modifdonne('Objectifglucide',200);
  modifdonne('Objectifsucre',20);
  modifdonne('Objectiffibre',20);
  modifdonne('Objectifprot',40);
  modifdonne('Objectifsel',8);
  $(ons.notification.toast("N'oubliez pas de manger des l&eacute;gumes !", { timeout: 2000, animation: "fall" }))
  }
  else{
        datecompare = lecturedonnes('Today').split("@")
        if ((datecompare[7] ) != (Datecourante)){
          modifdonne('Today','0@0@0@0@0@0@0@'+Datecourante);
          nouveau_jour();
          $(ons.notification.toast("N'oubliez pas de manger des l&eacute;gumes !", { timeout: 2000, animation: "fall" }))
    }
        else{affiche_aliments();}
  }
}

function remove(entree){
  localStorage.removeItem(entree);
}

function Affichagephrases(){
    donnee = lecturedonnes("Today")
    donnee = donnee.split("@") ;
    valcalorie = parseFloat(donnee[0]) ;
    valgras = parseFloat(donnee[1]) ;
    valglucide = parseFloat(donnee[2]) ;
    valsucre = parseFloat(donnee[3]) ;
    valfibre = parseFloat(donnee[4]) ;
    valprot = parseFloat(donnee[5]) ;
    valsel = parseFloat(donnee[6]) ;

    objectifcalorie = lecturedonnes("Objectifcalorie")
    objectifcalorie = parseFloat(objectifcalorie)
    objectifgras = lecturedonnes("Objectifgras")
    objectifgras = parseFloat(objectifgras)
    objectifglucide = lecturedonnes("Objectifglucide")
    objectifglucide = parseFloat(objectifglucide)
    objectifsucre = lecturedonnes("Objectifsucre")
    objectifsucre = parseFloat(objectifsucre)
    objectiffibre = lecturedonnes("Objectiffibre")
    objectiffibre = parseFloat(objectiffibre)
    objectifprot = lecturedonnes("Objectifprot")
    objectifprot = parseFloat(objectifprot)
    objectifsel = lecturedonnes("Objectifsel")
    objectifsel= parseFloat(objectifsel)

    $("#caloriemange").html(Number.parseFloat(valcalorie).toFixed(2))
    $("#grasmange").html(Number.parseFloat(valgras).toFixed(2))
    $("#glucidemange").html(Number.parseFloat(valglucide).toFixed(2))
    $("#sucremange").html(Number.parseFloat(valsucre).toFixed(2))
    $("#fibremange").html(Number.parseFloat(valfibre).toFixed(2))
    $("#protmange").html(Number.parseFloat(valprot).toFixed(2))
    $("#selmange").html(Number.parseFloat(valsel).toFixed(2))

    diffcalorie = objectifcalorie - valcalorie
    diffgras = objectifgras - valgras
    diffglucide = objectifglucide - valglucide
    diffsucre = objectifsucre - valsucre
    difffibre = objectiffibre - valfibre
    diffprot = objectifprot - valprot
    diffsel = objectifsel - valsel


    if (diffcalorie < 0){
      diffcalorie = diffcalorie + (-2 * diffcalorie)
      $("#restecalorie").html(Number.parseFloat(diffcalorie).toFixed(2))
      $("#restecalorie").css('color', 'red');
        if (kalorie == 0){
      $(ons.notification.toast('Un petit footing et on ferme les yeux sur cet exc&egrave;s de calories', { timeout: 2000, animation: 'fall' }))
      kalorie = 1
    }}

    else {
      $("#restecalorie").html(Number.parseFloat(diffcalorie).toFixed(2))
      $("#restecalorie").css('color', 'white');
      kalorie = 0
    }

    if (  diffgras < 0){
        diffgras =   diffgras + (-2 *   diffgras)
      $("#restegras").html(Number.parseFloat(diffgras).toFixed(2))
      $("#restegras").css('color', 'red');
        if (gras == 0){
      $(ons.notification.toast('Faites attention &agrave; votre consommation de mati&egrave;res grasses', { timeout: 2000, animation: 'fall' }))
      gras = 1
    }}

    else {
      $("#restegras").html(Number.parseFloat(diffgras).toFixed(2))
      $("#restegras").css('color', 'white');
      gras = 0
    }

    if (diffglucide < 0){
      diffglucide = diffglucide + (-2 * diffglucide)
      $("#resteglucide").html(Number.parseFloat(diffglucide).toFixed(2))
      $("#resteglucide").css('color', 'red');
        if (glucyde == 0){
      $(ons.notification.toast('Une surconsommation de glucides conduit à une "mauvaise" prise de poids, allez marcher !', { timeout: 2500, animation: 'fall' }))
      glucyde = 1
    }}

    else {
      $("#resteglucide").html(Number.parseFloat(diffglucide).toFixed(2))
      $("#resteglucide").css('color', 'white');
      glucyde = 0
    }

    if (diffsucre < 0){
      diffsucre = diffsucre + (-2 * diffsucre)
      $("#restesucre").html(Number.parseFloat(diffsucre).toFixed(2))
      $("#restesucre").css('color', 'red');
      if (sugar == 0){
      $(ons.notification.toast('Une petite marche de 30min vous aidera &agrave; mieux métaboliser tout ce sucre', { timeout: 2500, animation: 'fall' }))
      sugar = 1
    }
    }

    else {
      $("#restesucre").html(Number.parseFloat(diffsucre).toFixed(2))
      $("#restesucre").css('color', 'white');
      sugar = 0
    }

    if (difffibre < 0){
      difffibre = difffibre + (-2 * difffibre)
      $("#restefibre").html(Number.parseFloat(difffibre).toFixed(2))
      $("#restefibre").css('color', 'orange');
      if (phibre == 0){
      phibre = 1
    }
    }

    else {
      $("#restefibre").html(Number.parseFloat(difffibre).toFixed(2))
      $("#restefibre").css('color', 'white');
      phibre = 0
    }

    if (diffprot < 0){
      diffprot = diffprot + (-2 * diffprot)
      $("#resteprot").html(Number.parseFloat(diffprot).toFixed(2))
      $("#resteprot").css('color', 'orange');
      if (protein == 0){
      protein = 1
    }
    }

    else {
      protein = 0
      $("#resteprot").html(Number.parseFloat(diffprot).toFixed(2))
      $("#resteprot").css('color', 'white');
    }


    if (diffsel < 0){
      diffsel = diffsel + (-2 * diffsel)
      $("#restesel").html(Number.parseFloat(diffsel).toFixed(2))
      $("#restesel").css('color', 'red');
      if (salt == 0){
      $(ons.notification.toast('Une surconsommation de sel peut cr&eacute;er des maladies cardiovasculaires !', { timeout: 2500, animation: 'fall' }))
      salt = 1
    }}

    else {
      $("#restesel").html(Number.parseFloat(diffsel).toFixed(2))
      $("#restesel").css('color', 'white');
      salt = 0
    }
}

function generatenumbercalorie(){
  $("#objectifcalorie").html("")
  objectifcalorie = lecturedonnes("Objectifcalorie")
  objectifcalorie = parseFloat(objectifcalorie)

  for (var i = 1000; i <= 3000 + 1;) {

    if(i == objectifcalorie ){
      chaine = '<option value = '+i+' selected>'+i+"kcal"+'</option>'
    }

    else{
    chaine = '<option value = '+i+'>'+i+"kcal"+'</option>'
}
    i = i + 100;
    $("#objectifcalorie").append(chaine);
}

}

function generatenumbergras(){
  $("#objectifgras").html("")
  objectifgras = lecturedonnes("Objectifgras")
  objectifgras = parseFloat(objectifgras)

  for (var i = 10; i < 35 + 1; i++) {

    if(i == objectifgras ){
      chaine = '<option value = '+i+' selected>'+i+"g"+'</option>'
    }

    else{
    chaine = '<option value = '+i+'>'+i+"g"+'</option>'
}
    $("#objectifgras").append(chaine);
}

}

function generatenumberglucide(){
  $("#objectifglucide").html("")
  objectifglucide = lecturedonnes("Objectifglucide")
  objectifglucide = parseFloat(objectifglucide)

  for (var i = 135; i < 488 + 1; i++) {

    if(i == objectifglucide ){
      chaine = '<option value = '+i+' selected>'+i+"g"+'</option>'
    }

    else{
    chaine = '<option value = '+i+'>'+i+"g"+'</option>'
}
    $("#objectifglucide").append(chaine);
}

}

function generatenumbersucre(){
  $("#objectifsucre").html("")
  objectifsucre = lecturedonnes("Objectifsucre")
  objectifsucre = parseFloat(objectifsucre)

  for (var i = 10; i < 30 + 1; i++) {

    if(i == objectifsucre ){
      chaine = '<option value = '+i+' selected>'+i+"g"+'</option>'
    }

    else{
    chaine = '<option value = '+i+'>'+i+"g"+'</option>'
}
    $("#objectifsucre").append(chaine);
}

}

function generatenumberfibre(){
  $("#objectiffibre").html("")
  objectiffibre = lecturedonnes("Objectiffibre")
  objectiffibre = parseFloat(objectiffibre)

  for (var i = 10; i < 30 + 1; i++) {

    if(i == objectiffibre ){
      chaine = '<option value = '+i+' selected>'+i+"g"+'</option>'
    }

    else{
    chaine = '<option value = '+i+'>'+i+"g"+'</option>'
}
    $("#objectiffibre").append(chaine);
}

}

function generatenumberprot(){

  $("#objectifprot").html("")
  objectifprot = lecturedonnes("Objectifprot")
  objectifprot = parseFloat(objectifprot)
  for (var i = 40; i < 200 + 1; i++) {

    if(i == objectifprot ){
      chaine = '<option value = '+i+' selected>'+i+"g"+'</option>'
    }

    else{
    chaine = '<option value = '+i+'>'+i+"g"+'</option>'
    }

    $("#objectifprot").append(chaine);
  }
}

function generatenumbersel(){
  $("#objectifsel").html("")
  objectifsel = lecturedonnes("Objectifsel")
  objectifsel= parseFloat(objectifsel)

  for (var i = 5; i < 12 + 1; i++) {

    if(i == objectifsel ){
      chaine = '<option value = '+i+' selected>'+i+"g"+'</option>'
    }

    else{
    chaine = '<option value = '+i+'>'+i+"g"+'</option>'
}
    $("#objectifsel").append(chaine);
}

}

function quelbouton(classe,cequetuveux){
  index = $(classe).index(cequetuveux);
  name = $("#d_liste").find("ons-list-item").eq(index).find("div").eq(0).data("cle");
  return name
}

function AlertDialogdelete() {
  cle = sessionStorage.getItem("Nom")
  dose = lecturedonnes(cle)
  dose = dose.split("@")
  dosecalorie = parseFloat(dose[0])*parseFloat(dose[1])
  dosegras = parseFloat(dose[0])*parseFloat(dose[2])
  doseglucide = parseFloat(dose[0])*parseFloat(dose[3])
  dosesucre = parseFloat(dose[0])*parseFloat(dose[4])
  dosefibre = parseFloat(dose[0])*parseFloat(dose[5])
  doseprot = parseFloat(dose[0])*parseFloat(dose[6])
  dosesel = parseFloat(dose[0])*parseFloat(dose[7])

  today = lecturedonnes("Today")
  today = today.split("@")
  totalcalorie = today[0]
  totalgras = today[1]
  totalglucide = today[2]
  totalsucre = today[3]
  totalfibre = today[4]
  totalprot = today[5]
  totalsel = today[6]

  date = today[7]
  modifdonne("Today",(totalcalorie-dosecalorie)+"@"+(totalgras-dosegras)+"@"+(totalglucide-doseglucide)+"@"+(totalsucre-dosesucre)+"@"+(totalfibre-dosefibre)+"@"+(totalprot-doseprot)+"@"+(totalsel-dosesel)+"@"+date)
  $(ons.notification.toast("L'&eacute;l&eacute;ment "+cle+' a bien &eacute;t&eacute; supprim&eacute;', { timeout: 1500, animation: 'fall' }))
  remove(cle);
  hideDialog('my-alert-dialog')
  affiche_aliments();
  Affichagephrases();
  }

function hideDialog(id) {
  document
    .getElementById(id)
    .hide();
};

$(document).on("click",".buttoninfo",function(){
  aliment = quelbouton(".buttoninfo",this)
  sessionStorage.setItem("aliment",aliment)
  CreateAlertDialog(7)
})

$(document).on("click",".buttonplus",function(){
  cle = quelbouton(".buttonplus",this);
  dose = lecturedonnes(cle)
  dose = dose.split("@")
  quantite = parseFloat(dose[0]) + 1 ;
  calorie = parseFloat(dose[1]);
  mg = parseFloat(dose[2]);
  glucide = parseFloat(dose[3]);
  sucre = parseFloat(dose[4]);
  fibre = parseFloat(dose[5]);
  prot = parseFloat(dose[6]);
  sel = parseFloat(dose[7]);

  modifdonne(cle,quantite+"@"+calorie+"@"+mg+"@"+glucide+"@"+sucre+"@"+fibre+"@"+prot+"@"+sel) ;
  donnee = lecturedonnes("Today")
  donnee = donnee.split("@")
  calorieglobal = calorie + parseFloat(donnee[0]);
  mgglobal = mg + parseFloat(donnee[1]);
  glucideglobal = glucide + parseFloat(donnee[2]);
  sucreglobal = sucre + parseFloat(donnee[3]);
  fibreglobal = fibre + parseFloat(donnee[4]);
  protglobal = prot + parseFloat(donnee[5]) ;
  selglobal = sel + parseFloat(donnee[6]);

  date = parseFloat(donnee[7]);
  modifdonne("Today",calorieglobal+"@"+mgglobal+"@"+glucideglobal+"@"+sucreglobal+"@"+fibreglobal+"@"+protglobal+"@"+selglobal+"@"+date) ;
  affiche_aliments();
  Affichagephrases();
});

$(document).on("click",".buttonmoins",function(){
  cle = quelbouton(".buttonmoins",this);
  dose = lecturedonnes(cle)
  dose = dose.split("@")

  if(parseFloat(dose[0]) > 0){
    quantite = parseFloat(dose[0]) - 1 ;
    calorie = parseFloat(dose[1]);
    mg = parseFloat(dose[2]);
    glucide = parseFloat(dose[3]);
    sucre = parseFloat(dose[4]);
    fibre = parseFloat(dose[5]);
    prot = parseFloat(dose[6]);
    sel = parseFloat(dose[7]);

    modifdonne(cle,quantite+"@"+calorie+"@"+mg+"@"+glucide+"@"+sucre+"@"+fibre+"@"+prot+"@"+sel) ;
    donnee = lecturedonnes("Today")
    donnee = donnee.split("@")
    calorieglobal =  parseFloat(donnee[0]) - calorie ;
    mgglobal =parseFloat(donnee[1]) - mg;
    glucideglobal = parseFloat(donnee[2]) - glucide ;
    sucreglobal = parseFloat(donnee[3]) - sucre ;
    fibreglobal = parseFloat(donnee[4]) - fibre ;
    protglobal = parseFloat(donnee[5]) - prot ;
    selglobal =  parseFloat(donnee[6]) - sel;

    date = parseFloat(donnee[7]);
      modifdonne("Today",calorieglobal+"@"+mgglobal+"@"+glucideglobal+"@"+sucreglobal+"@"+fibreglobal+"@"+protglobal+"@"+selglobal+"@"+date) ;
  }
  affiche_aliments();
  Affichagephrases();
})

$(document).on("click",".buttontrash",function(){
  cle = quelbouton(".buttontrash",this);
  sessionStorage.setItem("Nom",cle)
  CreateAlertDialog(2);
})

$(document).on("click","#newitem",function(){
  CreateAlertDialog(3)
})

$(document).on("change","#objectifcalorie",function(){
  valeur = $(this).val() ;
  modifdonne("Objectifcalorie",valeur)
  Affichagephrases()
})

$(document).on("change","#objectifgras",function(){
  valeur = $(this).val() ;
  modifdonne("Objectifgras",valeur)
  Affichagephrases()
})

$(document).on("change","#objectifglucide",function(){
  valeur = $(this).val() ;
  modifdonne("Objectifglucide",valeur)
  Affichagephrases()
})

$(document).on("change","#objectifsucre",function(){
  valeur = $(this).val() ;
  modifdonne("Objectifsucre",valeur)
  Affichagephrases()
})

$(document).on("change","#objectiffibre",function(){
  valeur = $(this).val() ;
  modifdonne("Objectiffibre",valeur)
  Affichagephrases()
})

$(document).on("change","#objectifprot",function(){
  valeur = $(this).val() ;
  modifdonne("Objectifprot",valeur)
  Affichagephrases()
})

$(document).on("change","#objectifsel",function(){
  valeur = $(this).val() ;
  modifdonne("Objectifsel",valeur)
  Affichagephrases()
})

$(document).on("click","#calculimc",function(){
      masse = parseFloat($("#masse").val());
      taille = parseFloat($("#taille").val());
      imc = masse / (taille*taille)
      $("#resultimc").html(Number.parseFloat(imc).toFixed(2));
      if (imc < 18.5){
        $("#imcpoid").html("Vous &ecirc;tes consid&eacute;r&eacute; comme m&eacute;dicalement maigre").css('color', 'red');
      }
      else if (imc > 25) {
          $("#imcpoid").html("Vous &ecirc;tes en situation de surpoids").css('color', 'red');
      }
      else{
        $("#imcpoid").html("");
      }
});

$(document).on('show', function(e){
  if (e.target.matches('#accueil')) {
    affiche_aliments();
    generatenumbercalorie();
    generatenumbergras();
    generatenumberglucide();
    generatenumbersucre();
    generatenumberfibre();
    generatenumberprot();
    generatenumbersel();
    Affichagephrases();

};

  })

$(document).on('preshow', function(e){
if (e.target.matches('#my-alert-dialoginfo')) {
    name = sessionStorage.getItem("aliment")
    donnees = lecturedonnes(name)
    donnees = donnees.split("@")
    $("#infoaliment").html(name)
    $("#dosecalorieinfo").val(donnees[1]+"kcal")
    $("#dosegrasinfo").val(donnees[2]+"g")
    $("#doseglucideinfo").val(donnees[3]+"g")
    $("#dosesucreinfo").val(donnees[4]+"g")
    $("#dosefibreinfo").val(donnees[5]+"g")
    $("#doseprotinfo").val(donnees[6]+"g")
    $("#doseselinfo").val(donnees[7]+"g")

 }
 if (e.target.matches('#my-alert-dialogedit')) {
   name = sessionStorage.getItem("aliment")
   donnees = lecturedonnes(name)
   donnees = donnees.split("@")
   $("#editaliment").html(name)
   $("#dosecalorieedit").val(donnees[1])
   $("#dosegrasedit").val(donnees[2])
   $("#doseglucideedit").val(donnees[3])
   $("#dosesucreedit").val(donnees[4])
   $("#dosefibreedit").val(donnees[5])
   $("#doseprotedit").val(donnees[6])
   $("#doseseledit").val(donnees[7])
 }
})

$(document).on("change","#Search",function(){
    $(ons.notification.toast("En vrai ça sert &agrave; rien, mais c'est joli !", { timeout: 2000, animation: 'fall' }))
})

function AlertDialogedit() {

  aliment = sessionStorage.getItem("aliment")
  d = lecturedonnes(aliment)
  c = $("#dosecalorieedit").val()
  m = $("#dosegrasedit").val()
  g = $("#doseglucideedit").val()
  s = $("#dosesucreedit").val()
  f = $("#dosefibreedit").val()
  p = $("#doseprotedit").val()
  sel = $("#doseseledit").val()

  modifdonne(aliment,d[0]+"@"+c+"@"+m+"@"+g+"@"+s+"@"+f+"@"+p+"@"+sel)
  $("#dosecalorieedit").val("")
  $("#dosegrasedit").val("")
  $("#dosegrasedit").val("")
  $("#dosesucreedit").val("")
  $("#dosefibreedit").val("")
  $("#doseprotedit").val("")
  $("#doseseledit").val("")
  AlertDialogbtwo()
}

function AlertDialogbtwo() {
  hideDialog("my-alert-dialogedit")
  hideDialog("my-alert-dialoginfo")
}

function AlertDialogajouter() {
    aliment = $("#aliments").val()
    dose = $("#quantite").val()
    doseprot = $("#doseprot").val()
    dosesucre = $("#dosesucre").val()
    dosesel = $("#dosesel").val()
    dosefibre = $("#dosefibre").val()
    dosecalorie = $("#dosecalorie").val()
    dosemg = $("#dosemg").val()
    doseglucide = $("#doseglucide").val()


    if(aliment != "" || dose != ""){

    if (dosesucre == ""){
      dosesucre = 0
    }

    if (dosesel == ""){
      dosesel = 0
    }

    if (doseprot == ""){
      doseprot = 0
    }

    if (dosefibre == ""){
      dosefibre = 0
    }

    if (dosecalorie == ""){
      dosecalorie = 0
    }

    if (dosemg == ""){
      dosemg = 0
    }

    if (doseglucide == ""){
      doseglucide = 0
    }

    modifdonne(aliment,0+"@"+Number.parseFloat((dosecalorie*dose)/100).toFixed(2)+"@"+Number.parseFloat((dosemg*dose)/100).toFixed(2)+"@"+Number.parseFloat((doseglucide*dose)/100).toFixed(2)+"@"+Number.parseFloat((dosesucre*dose)/100).toFixed(2)+"@"+Number.parseFloat((dosefibre*dose)/100).toFixed(2)+"0@"+Number.parseFloat((doseprot*dose)/100).toFixed(2)+"@"+Number.parseFloat((dosesel*dose)/100).toFixed(2))
    $("#aliments").val("")
    $("#quantite").val("");
    $("#doseprot").val("");
    $("#dosesucre").val("");
    $("#dosesel").val("");
    $("#dosefibre").val("");
    $("#dosecalorie").val("");
    $("#dosequantite").val("");
    $("#dosemg").val("");
    $("#doseglucide").val("");
    $(ons.notification.toast("L'&eacute;l&eacute;ment "+aliment+' a bien &eacute;t&eacute; ajout&eacute;', { timeout: 1500, animation: 'fall' }))
    hideDialog('my-alert-dialogajoue')
    affiche_aliments();
  }

  else{
    $(ons.notification.alert("Rentrez le nom d'un aliment et une quantit&eacute;"))
  }

};

ons.ready(function(){
  datecompare();
});
