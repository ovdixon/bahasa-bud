class Navigation {

	constructor(links, pages){
		this.links = links;
		this.pages = pages;
		this.currentPage = null;
	}

	getLinks() {
		//console.log(this.links);
	}

	setPage(pageId) {
		this.currentPage = pageId;

		this.links.forEach((link) => {
			link.classList.remove('active');
			if (this.getHash(link) === pageId) {
				link.classList.add('active');
			}
		})

		this.pages.forEach((page) => {
			page.style.display = 'none';
		})

		document.getElementById(pageId).style.display = 'block';

		//
		let lis = document.getElementsByClassName('nav-links')[0].getElementsByTagName("li");
		var isPast = false;
		for (var i=0;i<lis.length; i++){
			var len = lis[i].getElementsByClassName('active').length
			var child = lis[i].children[0]
			if (len == 1){
				child.style.color = '#F45454';
				child.style.fontWeight = 'bold';
				isPast = true;
			} else if (len == 0 && isPast == false){
				child.style.color = '#F45454';
				child.style.fontWeight = 'bold';
			} else if (isPast == true){
				child.style.color = '#D3D3D3';
				child.style.fontWeight = 'bold';
			}
		}

	}
	

	getHash(link){
		return link.href.split('#')[1];
	}
}

export default Navigation;