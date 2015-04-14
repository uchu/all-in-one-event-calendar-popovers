# all-in-one-event-calendar-popovers
A library to display popovers for page elements.

It's a wrapper of regular Bootstrap popovers.
The main difference is that popovers has unique IDs that are stored
in localStorage and popovers that were closed don't appear on the 
page anymore. 

An example of usage:

<div class="ai1ec-bs-popover"
	data-placement="left"
	data-title="Title goes here"
	data-content="Can contain <strong>some</strong> HTML."
	data-popover-id="unique_popover_id">
	Element that needs a popover
</div>

Elements should have "ai1ec-bs-popover" class name and unique ID.

All other features of original BS popover can be used here also.
Please, see http://getbootstrap.com/javascript/#popovers 
