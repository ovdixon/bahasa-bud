import { list } from "postcss";

class pageNavigation {

	// create nav object and set values for object properties
	constructor(links, pages, dividers ){
		this.links = Array.from(links);
		this.pages = pages;
		this.dividers = Array.from(dividers);
		this.currentPage = null;
	}

	setPage(pageId) {
		this.currentPage = pageId; // get current page
		this.links.forEach((link) => { // set current active page and clear previous active page
			link.classList.remove('active');
			if (this.getHash(link) === pageId) {
				link.classList.add('active');
			}
		})

		this.pages.forEach((page) => {
			page.style.display = 'none'; // hide non active pages
		})

		document.getElementById(pageId).style.display = 'block'; // show active pages

		// index of active page for styling dividers
		let activeIndex  = this.getIndexByClass(this.links); 
		this.styleProgressBar(activeIndex);

	}

	styleProgressBar(activeIndex){	
		// set visited and unvisited pages
		// e.g. if on 'study', 'plan' is visited and 'review' is unvisited
		let completedLinks = this.links.slice(0,activeIndex); 
		let uncompletedlinks = this.links.slice(activeIndex+1); 

		// style links and dividers of visited pages
		if (completedLinks.length > 0){
			let completedDividers = this.dividers.slice(0,activeIndex)
			completedLinks.forEach(link => link.style.color="#F45454")
			completedDividers.forEach(divider => divider.style.color="#F45454")
		} 

		// style links and dividers of unvisited pages
		if (uncompletedlinks.length > 0){
			let uncompletedDividers = this.dividers.slice(activeIndex)
			uncompletedlinks.forEach(link => link.style.color="#D3D3D3")
			uncompletedDividers.forEach(divider => divider.style.color="#D3D3D3")
		}
		// style link of active page
		this.links[activeIndex].style.color = "#F45454";
		
	}

	// function for indexing the active page
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