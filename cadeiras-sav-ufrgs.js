var subjects = "";
$('[id^="tabbed_nome_atividade"').find("h2").each(function(i, obj) {
	temp = obj.innerText;
	temp = temp.replace(/(\r\n|\r|\n)+/g, '$1');
	subjects += (++i) + " - " + temp.replace(/\s+/g, ' ') + ";\n";
});
if (subjects != "") {
	alert("SUPOSTAMENTE você cursará: \n\n" + subjects);
} else {
	alert("Não conseguimos encontrar as cadeiras 😔");
}
