from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status

from .models import Topic
from .serializers import TopicSerializer


# Create your views here.

class TopicList(APIView):
    def get(self, request):
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = TopicSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    
class TopicDetail(APIView):
    def get_object(self, pk):
        try:
            return Topic.objects.get(pk=pk)
        except Topic.DoesNotExist:
            raise 404

    def get(self, request, pk):
        topic = self.get_object(pk)
        serializer = TopicSerializer(topic)
        return Response(serializer.data)

    def put(self, request, pk):
        topic = self.get_object(pk)
        serializer = TopicSerializer(topic, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        topic = self.get_object(pk)
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class TopicListCreate(generics.ListCreateAPIView):
#     queryset = Topic.objects.all()
#     serializer_class = TopicSerializer

# class TopicRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Topic.objects.all()
#     serializer_class = TopicSerializer
#     lookup_field = "pk"