from django.shortcuts import render
from django.views.generic import TemplateView



from chat.models import Room



#lass CategoryPage(TemplateView):
def index_view(request):
    return render(request, 'index.html', {
    'rooms': Room.objects.all(),
})

#lass Room_views(TemplateView):
def room_view(request, room_name):
    chat_room, created = Room.objects.get_or_create(name=room_name)
    return render(request, 'room.html', {
    'room': chat_room,
})


