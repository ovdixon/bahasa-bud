import { list } from "postcss";

class pageNavigation {

	constructor(links, pages, dividers ){
		this.links = Array.from(links);
		this.pages = pages;
		this.dividers = Array.from(dividers);
		this.currentPage = null;
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

		let activeIndex  = this.getIndexByClass(this.links);
		this.styleProgressBar(activeIndex);

	}

	styleProgressBar(activeIndex){	
		let completedLinks = this.links.slice(0,activeIndex);
		let uncompletedlinks = this.links.slice(activeIndex+1);

		if (completedLinks.length > 0){
			let completedDividers = this.dividers.slice(0,activeIndex)
			completedLinks.forEach(link => link.style.color="#F45454")
			completedDividers.forEach(divider => divider.style.color="#F45454")
		} 
		if (uncompletedlinks.length > 0){
			let uncompletedDividers = this.dividers.slice(activeIndex)
			uncompletedlinks.forEach(link => link.style.color="#D3D3D3")
			uncompletedDividers.forEach(divider => divider.style.color="#D3D3D3")
		}

		this.links[activeIndex].style.color = "#F45454";
		
	}

	getIndexByClass(list){
		for (var i=0;i<list.length;i++){
			if (list[i].className === "active"){
				return i;
			}
		}

	}

	getHash(link){
		return link.href.split('#')[1];
	}
}

export default pageNavigation;