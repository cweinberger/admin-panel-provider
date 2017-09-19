var AdminPanel = (function() {
	confirmDelete: function(element) {
			// Confirm modal title
			var modalTitle = $(element).data('delete-title');
			modalTitle = !modalTitle ? 'Please confirm' : modalTitle;

			// Confirm modal text
			var modalText = $(element).data('delete-text');
			modalText = !modalText ? 'Are you sure you want to delete?' : modalText;

			var closure = function(e) {
				// Prevent default action
				e.preventDefault();

				// Generate bootbox dialog
				bootbox.dialog({
					title: modalTitle,
					message: '<span class="fa fa-warning"></span> ' + modalText,
					className: 'nodes-delete',
					buttons: {
						cancel: {
							label: 'Cancel',
							className: 'btn-default'
						},
						success: {
							label: 'Delete',
							className: 'btn-danger',
							callback: function () {
								if ($(element).is('form')) {
									$(element).trigger('submit');
								} else {
									// Since we're posting data, we need to add our CSRF token
									// to our form so Laravel will accept our form
									// var csrfToken = $(element).data('token');
									// if (!csrfToken) {
									// 	alert('Missing CSRF token');
									// 	console.log('Missing CSRF token');
									// 	return;
									// }

									// Since <form>'s can't send a DELETE request
									// we need to use `POST`
									$('<form/>', {
										'method': 'POST',
										'action': $(element).attr('href')
									}).appendTo('body').submit();
								}
							}
						}
					},
					onEscape: true
				});
			};

			if ($(element).is('form')) {
				$(element).find(':submit').click(closure);
			} else {
				$(element).click(closure);
			}
		}
})

jQuery(document).ready(function($) {
	$('[data-confirm="true"]').each(function() {
		Nodes.confirmModal($(this));
	});
})